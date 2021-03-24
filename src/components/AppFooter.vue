<style scoped>
footer {
	position: static;
	bottom: 0;
	width: 100%;
}

.footer {
	background-size: cover;
	text-align: left;
}

.footer .response {
	color: #fff;
}

.footer .list-unstyled {
	list-style-type: none;
	padding-left: 0;
	width: 130px;
}

.footer .list-unstyled span {
	line-height: 28px;
	font-weight: 300;
	font-size: 13px;
	opacity: 0.7;
}

.footer__link {
	color: #fff;
	font-size: 12px;
	line-height: 28px;
	opacity: 0.4;
	font-weight: 300;
}

.footer__link-temp {
	opacity: 1;
	color: #2582ff;
}

.footer__link:hover {
	opacity: 1;
	color: #fff;
}

.footer__link:hover .footer__link-text {
	opacity: 1;
}

.footer__link-img {
	height: 22px;
	width: 22px;
	padding: 4px;
	margin-right: 0.6rem;
}

.footer__content h5 {
	font-size: 12px;
	line-height: 40px;
}

.footer__content-address {
	font-weight: 300;
	font-size: 13px;
	line-height: 28px;
	color: #fff;
	opacity: 0.4;
	margin-bottom: 0;
}

.footer__content-address span {
	font-size: 13px;
	font-weight: 300;
	opacity: 0.7;
}

.footer__email-input {
	display: block;
	background: #fbfbfb;
	border: 1px solid #eee;
	border-radius: 4px 4px 0 0;
	color: #9ca3ad;
	padding: 12px 18px 10px;
	width: 100%;
	max-width: 320px;
	font-size: 16px;
	-webkit-transition: all 0.15s ease-in-out;
	-moz-transition: all 0.15s ease-in-out;
	-ms-transition: all 0.15s ease-in-out;
	transition: all 0.15s ease-in-out;
	height: 50%;
	font-size: 12px;
}

.footer__email-input:focus {
	outline: 0;
	border-color: #2d86fb;
}

.footer__btn-submit {
	font-weight: 800;
	background: #2683ff;
	color: #fff;
	border-radius: 0 0 4px 4px;
	font-size: 16px;
	padding: 12px 16px;
	width: 100%;
	max-width: 320px;
	border: 0;
	z-index: 2;
	outline: 0;
	-webkit-backface-visibility: hidden;
	-moz-osx-font-smoothing: grayscale;
	-webkit-transition: all 0.15s ease-in-out;
	-moz-transition: all 0.15s ease-in-out;
	-ms-transition: all 0.15s ease-in-out;
	transition: all 0.15s ease-in-out;
	height: 50%;
	font-size: 12px;
}

.footer .footer__content h5 {
	margin-bottom: 0;
}

.footer .footer-message {
	color: #fff;
	font-size: 12px;
	line-height: 15px;
	margin-bottom: 10px;
}

.footer .social-section {
	padding-left: 0;
	margin-bottom: 0;
}

.footer .social-section .footer-social {
	display: inline;
}

.footer .social-section .footer-social .footer__link {
	opacity: 0.8;
}

.footer .social-section .footer-social .footer__link:hover {
	opacity: 1;
}

.footer .social-section .footer-social .social-link {
	opacity: 1;
	margin: auto 15px;
}

@media (max-width: 1024px) {
	.footer .social-section .footer-social .social-link {
		margin: auto 8px;
	}
}

@media (max-width: 768px) {
	.footer .social-section .footer-social .social-link {
		margin: auto 15px;
		margin-top: 25px;
	}
}

#mce-error-response-newsletter,
#mce-success-response-newsletter {
	display: none;
	font-size: 12px;
	line-height: 15px;
	margin-top: 10px;
}

@media (max-width: 991px) {
	.footer__logo-img {
		margin-bottom: 30px;
		width: inherit;
		height: auto;
	}

	.footer__link {
		line-height: 32px;
	}
}

@media (min-width: 874px) and (max-width: 991px) {
	.footer__content-item-btn {
		width: 400px;
	}
}

@media (max-width: 767px) {
	.footer__logo-img {
		width: 125px;
		height: auto;
	}
}
</style>

<template>
	<footer class="py-5">
		<div class="footer container">
			<div class="footer__content">
				<div class="row">
					<div
						class="col-12 col-sm-12 col-md-8 text-center text-md-left"
					>
						<address class="footer__content-address">
							© 2021 Storj Labs Inc. - 3423 Piedmont Road NE,
							Suite 475, Atlanta, Georgia, 30305, United States
						</address>
					</div>
					<div
						class="col-12 col-sm-12 col-md-4 text-center text-md-right"
					>
						<ul class="social-section">
							<li class="footer-social">
								<a
									rel="noopener noreferrer"
									class="footer__link"
									href="https://twitter.com/storjproject"
									target="_blank"
									><img
										class="social-link"
										src="@/assets/twitter-footer.svg"
										alt=""
								/></a>
							</li>
							<li class="footer-social">
								<a
									rel="noopener noreferrer"
									class="footer__link"
									href="https://github.com/Storj/"
									target="_blank"
									><img
										class="social-link"
										src="@/assets/github-footer.svg"
										alt=""
								/></a>
							</li>
							<li class="footer-social">
								<a
									rel="noopener noreferrer"
									class="footer__link"
									href="https://www.reddit.com/r/storj/"
									target="_blank"
									><img
										class="social-link"
										src="@/assets/reddit-footer.svg"
										alt=""
								/></a>
							</li>
							<li class="footer-social">
								<a
									rel="noopener noreferrer"
									class="footer__link"
									href="https://www.facebook.com/storjproject"
									target="_blank"
									><img
										class="social-link"
										src="@/assets/facebook-footer.svg"
										alt=""
								/></a>
							</li>
							<li class="footer-social">
								<a
									rel="noopener noreferrer"
									class="footer__link"
									href="https://medium.com/@storjproject"
									target="_blank"
									><img
										class="social-link"
										src="@/assets/medium-footer.svg"
										alt=""
								/></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>
