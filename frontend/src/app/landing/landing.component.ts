import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService, TOKEN_NAME} from '../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']

})
export class LandingComponent implements OnInit {

  visibility = 'all';
  filteredReviews = [];

  public reviews: any[] = [
    {
      desc: 'Mock Review',
      year: 2015,
      complete: true
    },
    {
      desc: 'Mock Review',
      year: 2019,
      complete: true
    },
    {
      desc: 'Upcoming Mock Review',
      year: 2022,
      complete: false
    }
  ];

  public userName = '';
  private userId: number;
  private mockData = true;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.userName = this.authService.getUsername();
    this.userId = this.authService.getSessionUserId();

    this.renderReviews();
  }

  renderReviews() {
    // fetch reviews and handle here..
    this.fetchPerformanceReviews().subscribe(
      (response) => {

        if (response.result.length > 0) {
          this.reviews = response.result;
          this.mockData = false;
        }
        this.filterReviews('all');
      },
      (error) => {
        console.log('failed to fetch reviews', error);
        // filter mock records
        this.filterReviews('all');
      });
  }

  fetchPerformanceReviews() {
    const url = 'http://localhost:4201/api/v1';
    const token = localStorage.getItem(TOKEN_NAME);
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`
    });
    const options = { headers };
    return this.http.get<any>(`${AuthService.API_BASE_PATH}/reviews?id=${this.userId}`, options);
  }


  filterReviews(filter: string) {
    this.visibility = filter;
    if (filter === 'all') {
      this.filteredReviews = this.reviews.map((review) => review);
    }
    if (filter === 'complete') {
      this.filteredReviews = this.reviews.filter((review) => review.complete);
    }
    if (filter === 'incomplete') {
      this.filteredReviews = this.reviews.filter((review) => !review.complete);
    }
  }

  toggleReview(review: any) {
    review.complete = !review.complete;
    this.filterReviews(this.visibility);
  }


  deleteReview(index: number) {
    if (this.visibility === 'all') {
      this.reviews.splice(index, 1);
    } else {
      const findCompleted = (this.visibility === 'complete') ? true : false;
      const matchedIdxs = [];
      this.reviews.map((review, idx) => {
        if (review.complete === findCompleted) {
          matchedIdxs.push(idx);
        }
      });
      this.reviews.splice(matchedIdxs[index], 1);
    }
    this.filterReviews(this.visibility);
  }

}
