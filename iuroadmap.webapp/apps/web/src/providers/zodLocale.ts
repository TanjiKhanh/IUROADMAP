import { z } from 'zod';
import { getTranslation } from '@iuroadmap/core';

let currentLang: 'en' | 'vi' = 'en';

export function setZodLocale(lang: 'en' | 'vi') {
  currentLang = lang;
}

export function initZodLocale() {
  const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    let message = ctx.defaultError;

    // Use existing translations keys for zod validation errors
    if (issue.code === z.ZodIssueCode.invalid_type) {
      message = getTranslation(currentLang, 'yupGlobal.invalidType') as string;
    } else if (issue.code === z.ZodIssueCode.too_small) {
      if (issue.type === 'string') {
        message = (getTranslation(currentLang, 'yupGlobal.string.min') as string).replace('${min}', String(issue.minimum));
      } else if (issue.type === 'number') {
        message = (getTranslation(currentLang, 'yupGlobal.number.min') as string).replace('${min}', String(issue.minimum));
      }
    } else if (issue.code === z.ZodIssueCode.too_big) {
      if (issue.type === 'string') {
        message = (getTranslation(currentLang, 'yupGlobal.string.max') as string).replace('${max}', String(issue.maximum));
      } else if (issue.type === 'number') {
        message = (getTranslation(currentLang, 'yupGlobal.number.max') as string).replace('${max}', String(issue.maximum));
      }
    } else if (issue.code === z.ZodIssueCode.invalid_string) {
      if (issue.validation === 'email') {
        message = getTranslation(currentLang, 'yupGlobal.email.invalid') as string;
      } else if (issue.validation === 'url') {
        message = getTranslation(currentLang, 'yupGlobal.string.url') as string;
      }
    }
    
    // Fallback required message check
    if (message === ctx.defaultError && (issue.code === z.ZodIssueCode.invalid_type && issue.received === 'undefined')) {
        message = getTranslation(currentLang, 'yupGlobal.required') as string;
    }

    return { message };
  };

  z.setErrorMap(customErrorMap);
}
