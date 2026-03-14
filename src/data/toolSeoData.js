// src/data/toolSeoData.js — kept for any direct imports
import developerSeoData from './seo/developer.js'
import textSeoData from './seo/text.js'
import financeSeoData from './seo/finance.js'
import careerSeoData from './seo/career.js'
import hrSeoData from './seo/hr.js'
import pdfSeoData from './seo/pdf.js'
import imageSeoData from './seo/image.js'
import seoToolsSeoData from './seo/seo.js'

export const toolSeoData = {
  ...developerSeoData,
  ...textSeoData,
  ...financeSeoData,
  ...careerSeoData,
  ...hrSeoData,
  ...pdfSeoData,
  ...imageSeoData,
  ...seoToolsSeoData,
}
