import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Environment } from 'src/app/models/environment/oAuth.model';

@Injectable({
    providedIn: 'root',
})
export class EnvironmentService {
    public is = (isEnvironment: Environment) => environment.environment === isEnvironment;
}
