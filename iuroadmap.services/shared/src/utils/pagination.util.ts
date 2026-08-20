import { PaginationRequest, PaginationResponse } from '../models';

/**
 * Generic Prisma Pagination Utility (Strategy/Callback Pattern)
 * 
 * @param prismaModel - Prisma Model Delegate (e.g. prisma.role, prisma.user)
 * @param filter - The pagination filter DTO from the request
 * @param buildWhereFunc - Callback function that returns the Prisma `where` object
 * @param findManyOptions - Optional Prisma findMany options (include, orderBy, etc.)
 * @returns PaginationResponse with data and pagination metadata
 */
export async function getPaginationAsync<TFilter extends PaginationRequest, TEntity>(
  prismaModel: any,
  filter: TFilter,
  buildWhereFunc: (f: TFilter) => any,
  findManyOptions?: any,
): Promise<PaginationResponse<TEntity>> {
  const currentPage = filter.currentPage ?? 1;
  const rowsPerPage = filter.rowsPerPage ?? 10;
  const skip = (currentPage - 1) * rowsPerPage;

  // Execute strategy to get dynamic WHERE clause
  const where = buildWhereFunc(filter);

  // Default sort logic if orderBy is not provided in findManyOptions
  const orderBy = findManyOptions?.orderBy || { id: 'asc' };

  // Parallel database queries
  const [records, totalRows] = await Promise.all([
    prismaModel.findMany({
      where,
      orderBy,
      skip,
      take: rowsPerPage,
      ...findManyOptions,
    }),
    prismaModel.count({ where }),
  ]);

  const response = new PaginationResponse<TEntity>();
  response.currentPage = currentPage;
  response.rowsPerPage = rowsPerPage;
  response.totalRows = totalRows;
  response.datas = records;

  return response;
}
