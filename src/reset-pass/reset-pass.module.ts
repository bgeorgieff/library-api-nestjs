import { Module } from '@nestjs/common';
import { ResetPassService } from './reset-pass.service';
import { TokenSchema } from 'src/schemas/token.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }]),
  ],
  providers: [ResetPassService],
  exports: [ResetPassService],
})
export class ResetPassModule {}
