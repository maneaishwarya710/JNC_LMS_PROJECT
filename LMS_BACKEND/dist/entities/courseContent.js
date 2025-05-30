"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseContent = void 0;
const typeorm_1 = require("typeorm");
const course_1 = require("./course");
const class_validator_1 = require("class-validator");
let CourseContent = class CourseContent {
};
exports.CourseContent = CourseContent;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CourseContent.prototype, "contentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "tutorials", length: 50 }),
    __metadata("design:type", String)
], CourseContent.prototype, "contentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: class_validator_1.MAX, default: "default_content" }),
    __metadata("design:type", String)
], CourseContent.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_1.Course, (course) => course.contents, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "courseId" }),
    __metadata("design:type", course_1.Course)
], CourseContent.prototype, "course", void 0);
exports.CourseContent = CourseContent = __decorate([
    (0, typeorm_1.Entity)("COURSECONTENT_LMS")
], CourseContent);
