import React from 'react';
import './About.css';
import aboutWomen from '../assets/about-women.jpg'

export class About extends React.Component {
	render() {
		return(

			<div className='about-background'>

				<div className='about-photo'>
					<img src={aboutWomen} />
				</div>

				<div className='about-content'>
				
					<div className='about-logo'>
						CARTOGRAPH
					</div>

					<div className='about-text'>
						<section>
							<h3>it's about the journey <span className='about-italic'>and</span> the destination </h3>
							<p> Women are destined to be leaders. But with so many barriers, biases, and lack of representation, the journey can be daunting.</p>
							<p>CARTOGRAPH is a career planning tool designed specifically for women. It helps users navigate the professional world so they can reach their full, unencumbered potential.</p>
							<p>While its core feature is the planning app, CARTOGRAPH's power comes from the connections users make with each other. Women around the world can find mentors, mentees, and peers with whom to share their goals, strategies, and experiences.</p>
						</section>
						<section>
							<h3>what's in a name?</h3>
							<p>Cartography is the art and science of mapmaking. Our tool, CARTOGRAPH, helps women discover and navigate their professional worlds.</p>
						</section> 
						<section>
							<h3>learn more</h3>
							<p>Questions? Want to get involved? Contact the app creator <a href="&#106;&#111;&#121;&#064;&#104;&#101;&#108;&#108;&#111;&#046;&#099;&#111;&#100;&#101;&#115;">here</a>.</p>
						</section> 
					</div>

				</div>

			</div>
		)
	}	
}

export default About;


