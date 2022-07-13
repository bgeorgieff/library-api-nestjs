// import { BadRequestException } from '@nestjs/common';
// import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
// import { CloudinaryService } from './modules/cloudinary/cloudinary.service';

// export class Upload {
//   constructor(readonly cloudinaryService: CloudinaryService) {}

//   async uploadImage(
//     file: Express.Multer.File,
//   ): Promise<UploadApiResponse | UploadApiErrorResponse> {
//     const uploadedImg = await this.cloudinaryService
//       .uploadImage(file)
//       .catch(() => {
//         throw new BadRequestException('Invalid file type.');
//       });

//     return uploadedImg.url;
//   }
// }
