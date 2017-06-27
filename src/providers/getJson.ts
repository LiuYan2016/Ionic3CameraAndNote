import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class GetJson {
    constructor(public http:Http) {}

getData(jsonfile) {
    return this.http.get("assets/json/" + jsonfile)
        .map((res:Response) => res.json()); //records in this case
  }
}
