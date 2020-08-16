import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Name, Star} from '@app/_infra/core/models';
import * as StarsActions from '@app/_infra/store/actions/stars.actions';
import * as selectors from '@infra/store/selectors/stars.selectors';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {VideoPlayerModalComponent} from "@infra/ui";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'dsapp-star-content-page',
    templateUrl: './star-content-page.component.html',
})
export class StarContentPageComponent implements OnInit, OnDestroy {

    slug = null;
    star: Star = null;
    loading = true;
    subs: Subscription[] = [];

    constructor(private store: Store<any>, private route: ActivatedRoute, private modalService: NgbModal,) {
    }

    ngOnInit(): void {
        this.subs.push(
            this.route.params.subscribe((params: ParamMap) => {
                this.slug = params['slug'];
            })
        )
        this.subs.push(
            this.store.select(selectors.selectStarBySlug(this.slug)).subscribe(
                star => {
                    if (star) {
                        this.star = {...star};
                        this.loading = false;
                    } else {
                        this.store.dispatch(StarsActions.BeginGetStarsAction());
                    }
                })
        )
    }

    ngOnDestroy(): void {
        this.subs.forEach(s => s.unsubscribe());
    }
  
    openPromoModal(starName: Name | string, promoUrl: string) {
        const modalRef = this.modalService.open(VideoPlayerModalComponent, {size: 'xl', centered: true});
        modalRef.componentInstance.videoURL = promoUrl;
        modalRef.componentInstance.title = starName;
        modalRef.componentInstance.autoplay = true;
    }
}
