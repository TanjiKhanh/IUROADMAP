"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMentorProfileDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_mentor_profile_dto_1 = require("./create-mentor-profile.dto");
class UpdateMentorProfileDto extends (0, mapped_types_1.PartialType)(create_mentor_profile_dto_1.CreateMentorProfileDto) {
}
exports.UpdateMentorProfileDto = UpdateMentorProfileDto;
//# sourceMappingURL=update-mentor-profile.dto.js.map