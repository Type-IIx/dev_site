import React from 'react'
import { BASE_DOMAIN } from '../constants/apiInfo'

function TestimonyCard({ name, content, rating,image }) {
	return <>
	<div className="col-lg-4 col-md-6 col-sm-12">
              <div className="testimonial-block">
                <div className="inner-box">
                  <div className="upper-box">
                    <span className="quote-icon flaticon-quote-3"></span>
                    <div className="rating">
					{
							new Array(rating).fill().map((e, i) => {
								return <span key={`full-star-${i}`} className="fa fa-star"></span>

							})
						}

						{
							new Array(5 - rating).fill().map((e, i) => {
								return <span key={`empty-star-${i}`} className="fa fa-star-o"></span>

							})
						}
                    </div>
                    <div className="text">
					{content}
                    </div>
                  </div>
                  <div className="lower-box">
                    <div className="box-inner">
                      <div className="author-image">
                        <img src={BASE_DOMAIN + image} alt="" />
                      </div>
                      <h5>{name}</h5>
                      {/* <div className="designation">During Coaching</div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
		{/* <div className="testimonial-block">
			<div className="inner-box">
				<div className="upper-box">
					<span className="quote-icon flaticon-quote-3"></span>
					<div className="rating">
						{
							new Array(rating).fill().map((e, i) => {
								return <span key={`full-star-${i}`} className="fa fa-star"></span>

							})
						}

						{
							new Array(5 - rating).fill().map((e, i) => {
								return <span key={`empty-star-${i}`} className="fa fa-star-o"></span>

							})
						}

					</div>
					<div className="text">
						{content}
					</div>
				</div>
				<div className="lower-box">

					<h5>{name}</h5>
					{/* <div className="designation">During Coaching</div> 

				</div>
			</div>
		</div> */}
	</>
}

export default TestimonyCard