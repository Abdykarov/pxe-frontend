import { Injectable } from '@angular/core';
import { Environment } from 'src/app/models/environment/environment.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EnvironmentService {
    public is = (isEnvironment: Environment) =>
        environment.environment === isEnvironment;
}
