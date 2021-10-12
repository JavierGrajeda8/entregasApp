import { Pipe, PipeTransform } from '@angular/core';
import { ConstStatus } from 'src/app/core/constants/constStatus';
import { ConstStrings } from 'src/app/core/constants/constStrings';
import { CommonService } from 'src/app/core/services/common/common.service';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  constructor(private commonService: CommonService) {}
  transform(value: number, solicitante: boolean = true): string {
    let respuesta = '';
    respuesta = this.commonService.getActionExplicit(value, solicitante);
    return respuesta;
  }
}
