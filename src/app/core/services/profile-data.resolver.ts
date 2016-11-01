import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import {Injectable} from "@angular/core";
import {ProfileService} from "./profile.service";

@Injectable()
export class ProfileDataResolver implements Resolve<any> {

  constructor(private profileService: ProfileService) {
  }

  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    return this.profileService.getDeveloperProfile('');
  }

}
