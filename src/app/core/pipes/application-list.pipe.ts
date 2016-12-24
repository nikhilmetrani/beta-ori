import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {DeveloperApplication} from "../entities/developer-application";

@Pipe({
    name: 'boApplicationList'
})

@Injectable()
export class ApplicationListPipe implements PipeTransform{
    transform(applications: DeveloperApplication[], args: String): DeveloperApplication[] {
        let query = args.toLocaleLowerCase();
        return applications.filter((application =>
              (application.name.toLowerCase().indexOf(query) !== -1)
            ||(application.description !== null && application.description.toLowerCase().indexOf(query) !== -1)
            ||(application.category !== null && application.category.name.toLowerCase().indexOf(query) !== -1)));
    }
}
