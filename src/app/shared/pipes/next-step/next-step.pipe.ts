import { Pipe, PipeTransform } from '@angular/core';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { CommonService } from 'src/app/core/services/common/common.service';

@Pipe({
  name: 'nextStep',
})
export class NextStepPipe implements PipeTransform {
  constructor(private commonService: CommonService) {}

  async transform(idEstado: number, ...args: unknown[]) {
    console.log('idEstado', idEstado);
    const respuesta = await this.commonService.nextStep(idEstado);
    console.log('respuesta0', respuesta);
    return respuesta;
  }
}
