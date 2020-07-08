function showpass()
{
		var x = document.getElementById('psw');
		if (x.type === "text")
		{
			x.type = "password";
		}
		else
		{
			x.type = "text";
		}
}

function changecolor(y)
{
	if (document.getElementById(y).style.color === "black")
	{
		document.getElementById(y).style.color = "white";
	}
	else
	{
	document.getElementById(y).style.color = "black";
	}
}

function openlogin()
{
    document.getElementById("sidenav").style.width = "550px";
    document.getElementById("main").style.marginLeft = "450px";
		document.getElementById("2").value = "";
}

function closelogin()
{
    document.getElementById("sidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
		document.getElementById("2").value = "";
}

function opensignup()
{
		document.getElementById("sidenav2").style.width = "550px";
    document.getElementById("main").style.marginLeft = "450px";
}

function closesignup()
{
    document.getElementById("sidenav2").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";

}


/*slideshow*/
var slideIndex = 0;
var mytimer;
showSlides();

function shownext(n)
{
	var i;
	var slides = document.getElementsByClassName("mySlides");
	for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
	}
	slideIndex+=n;
	if(slideIndex== 0)
	{	slideIndex = slides.length; }
	if (slideIndex > slides.length) {slideIndex = 1}
	slides[slideIndex-1].style.display = "block";
	clearTimeout(mytimer);
	mytimer = setTimeout(showSlides,3000);
}

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
		mytimer = setTimeout(showSlides, 3000);
}
/*slideshow end*/


function uncheckall() {
		var x = document.getElementById("allcheckbox");
    if(x.checked = true)
			x.checked = false;
}
function uncheckrest(){
	var y = document.querySelectorAll("#rest1, #rest2, #rest3, #rest4, #rest5, #rest6");
	var i;
	for(i=0;i<y.length;i++)
		if(y[i].checked = true)
			y[i].checked = false;
}


  