import { TemplateCofigType } from "./types/templates";
import template1Thumb from '../assets/templateThumbnails/template1.png';
import template2Thumb from "../assets/templateThumbnails/template2.png";
import template3Thumb from "../assets/templateThumbnails/template3.png";
import template4Thumb from "../assets/templateThumbnails/template4.png";

export const templatesConfig: TemplateCofigType[] = [
  {
    id: "template1",
    label: "Template 1",
    thumbnail: template1Thumb,
    rating: 4,
    isNew: true,
    isCommingSoon: false
  },
  {
    id: "template2",
    label: "Template 2",
    thumbnail: template2Thumb,
    rating: 5,
    isNew: false,
    isCommingSoon: true
  },
  {
    id: "template3",
    label: "Template 3",
    thumbnail: template3Thumb,
    rating: 4.5,
    isNew: false,
    isCommingSoon: true
  },
  {
    id: "template4",
    label: "Template 4",
    thumbnail: template4Thumb,
    rating: 4.5,
    isNew: false,
    isCommingSoon: true
  }
]
