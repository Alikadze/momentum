import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departmentName'
})
export class DepartmentNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {

      if (value === 'დიზაინის დეპარტამენტი') {
          return 'დიზაინი'
      }

      if (value === 'მარკეტინგის დეპარტამენტი') {
          return 'მარკეტინგი'
      }

      if (value === 'IT დეპარტამენტი') {
          return 'ინფ. ტექ'
      }

      if (value === 'ლოჯისტიკის დეპარტამენტი') {
        return 'ლოჯისტიკა'
      }

      if (value === 'ადმინისტრაციის დეპარტამენტი') {
        return 'ადმინისტრაცია'
      }

      return ' ';

  }

}
