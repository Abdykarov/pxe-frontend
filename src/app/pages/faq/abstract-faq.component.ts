import { OnInit } from '@angular/core';

import {
    IQuestion,
    ITagConfigItem,
} from 'src/app/pages/faq/faq.model';
import { AbstractComponent } from 'src/common/abstract.component';


export class AbstractFaqComponent extends AbstractComponent implements OnInit {
    private tagsJSON = 'assets/configs/faq.json';
    private questionsJSON = 'assets/configs/questions.json';
    protected tagConfig: ITagConfigItem[] =  null;
    protected questions: IQuestion[] =  null;

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

}
