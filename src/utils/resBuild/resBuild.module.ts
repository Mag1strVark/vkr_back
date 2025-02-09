import { Global, Module } from '@nestjs/common'
import { ResponseBuildService } from './resBuild.service'

@Global()
@Module({
  providers: [ResponseBuildService],
  exports: [ResponseBuildService],
})
export class ResponseBuilderModule {}
