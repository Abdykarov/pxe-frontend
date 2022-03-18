import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as R from 'ramda';
import { IDotsDirection } from './models/dots-direction.model';
import { IIconPosition } from './models/icon-position.model';
// own models
import { IButtonSize } from './models/size.model';
import { IButtonType } from './models/type.model';
import { IButtonVariant } from './models/variant.model';

@Component({
    selector: 'lnd-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Output()
    public action: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    public customClass?: string;

    @Input()
    public customIconClass?: string;

    @Input()
    public dotsDirection?: IDotsDirection;

    @Input()
    public hasOutline = false;

    @Input()
    public icon?: string;

    @Input()
    public iconPosition?: IIconPosition;

    @Input()
    public isDisabled = false;

    @Input()
    public label?: string;

    @Input()
    public size?: IButtonSize;

    @Input()
    public submit = false;

    @Input()
    public type?: IButtonType;

    @Input()
    public variant?: IButtonVariant;

    constructor() {
        this.dotsDirection = R.contains(
            this.dotsDirection,
            Object.values(IDotsDirection)
        )
            ? this.dotsDirection
            : null;
        this.iconPosition = R.contains(
            this.iconPosition,
            Object.values(IIconPosition)
        )
            ? this.iconPosition
            : IIconPosition.LEFT;
        this.size = R.contains(this.size, Object.values(IButtonSize))
            ? this.size
            : null;
        this.type = R.contains(this.type, Object.values(IButtonType))
            ? this.type
            : null;
        this.variant = R.contains(this.variant, Object.values(IButtonVariant))
            ? this.variant
            : null;
    }
}
