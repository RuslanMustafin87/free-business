/* eslint-disable no-undef */
import "./scss/index.scss";
// eslint-disable-next-line no-unused-vars
import { Carousel } from "bootstrap";

import brandPath from "./images/icons/brand.svg";
import personPath from "./images/icons/person.svg";
import mailPath from "./images/icons/mail.svg";
import phonePath from "./images/icons/phone.svg";
import phoneDarkPath from "./images/icons/phone-dark.svg";

import schedulePath from "./images/icons/schedule.svg";
import settingsPath from "./images/icons/settings.svg";
import schoolPath from "./images/icons/school.svg";
import rocketLaunchPath from "./images/icons/rocket_launch.svg";
import sentimentSatisfiedPath from "./images/icons/sentiment_satisfied.svg";
import attachMoneyPath from "./images/icons/attach_money.svg";

import headphonesPath from "./images/icons/headphones.svg";
import unlockPath from "./images/icons/unlock.svg";
import backupPath from "./images/icons/backup.svg";
import thumbPath from "./images/icons/thumb.svg";

import twitterIconPath from "./images/icons/twitter.svg";
import facebookIconPath from "./images/icons/facebook.svg";
import googleIconPath from "./images/icons/google+.svg";
import inIconPath from "./images/icons/in.svg";

import laptopPath from "./images/laptop.webp";
import laptopPath1 from "./images/laptop1.webp";
import laptopPath2 from "./images/laptop2.webp";

import clientPath1 from "./images/Layer26.webp";
import clientPath2 from "./images/Layer22.webp";
import clientPath3 from "./images/Layer25.webp";
import clientPath4 from "./images/Layer23.webp";

brandIcon.src = brandPath;
personIcon.src = personPath;
personIconMap.src = personPath;
mailIcon.src = mailPath;
mailIconMap.src = mailPath;
phoneIcon.src = phonePath;
phoneIconFooter.src = phoneDarkPath;

scheduleIcon.src = schedulePath;
settingsIcon.src = settingsPath;
schoolIcon.src = schoolPath;
rocketLaunchIcon.src = rocketLaunchPath;
sentimentSatisfiedIcon.src = sentimentSatisfiedPath;
attachMoneyIcon.src = attachMoneyPath;

headphonesIcon.src = headphonesPath;
unlockIcon.src = unlockPath;
backupIcon.src = backupPath;
thumbIcon.src = thumbPath;

twitterIcon.src = twitterIconPath;
facebookIcon.src = facebookIconPath;
googleIcon.src = googleIconPath;
inIcon.src = inIconPath;

laptopImg0.src = laptopPath;
laptopImg1.src = laptopPath1;
laptopImg2.src = laptopPath2;

client1.src = clientPath1;
client2.src = clientPath2;
client3.src = clientPath3;
client4.src = clientPath4;

const buttonOpenNav = document.getElementById("buttonOpenNav");
const buttonCloseNav = document.getElementById("buttonCloseNav");
const navbarContent = document.getElementById("navbarContent");

buttonOpenNav.onclick = function () {
	navbarContent.classList.add("show-collapse");
};

buttonCloseNav.onclick = function () {
	navbarContent.classList.remove("show-collapse");
};

const listNavLinks = Array.from(document.querySelectorAll(".nav__link"));

listNavLinks.forEach(item => {
	item.addEventListener("click", () => {
		navbarContent.classList.remove("show-collapse");
	});
});
// const invalid = new CustomEvent('myinvalid');
inputFeedbackName.addEventListener("invalid", () => {
	inputFeedbackName.setCustomValidity("Error");
});

formFeedback.addEventListener("submit", function (event) {
	if (!this.checkValidity()) {
		event.preventDefault();
		console.log("ki");
		event.stopPropagation();
	}
	formFeedback.classList.add("was-validated");
});

const m = () => console.log("l");
const j = [
	"jjjjj",
	"kkkkkk",
	"kkkkkk" 
];
const b = 2;

function foo(err, ddd) {
	console.log(err, ddd);
}
foo();

const ob = { sdfsdf: "1232", num: 12 };
console.log(m, j, b, ob);

if (b) console.log("yes");
