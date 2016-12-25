import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {DeveloperApplication} from "../entities/developer-application";

@Pipe({
    name: 'boHideActiveAppsList'
})

@Injectable()
export class HideActiveAppsListPipe implements PipeTransform{
    transform(applications: DeveloperApplication[]): DeveloperApplication[] {
        return applications.filter(application =>
              (application.state.toLowerCase().indexOf("active") == -1));
    }
}
