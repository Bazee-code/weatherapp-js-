// all of our js will be written here!
window.addEventListener('load',()=>{
	// load event fires when the entire html doc including pics
	// and vids have loaded

	// select all of our DOM elements
	const actualLocation = document.querySelector('.actual-location');
	const actualTemp = document.querySelector('.actual-temp');
	const tempIcon = document.querySelector('.temp-icon');
	const tempDescription = document.querySelector('.temp-description');

	// declare our global vars
	let latitude;
	let longitude;
	let tempModified;
	// get our actual location
	// in browsers,our location is automatically stored under navigator.geolocation
	navigator.geolocation.getCurrentPosition((position)=>{
		// console.log("Current position",position);

		// set latitude and longitude
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		// proxy to navigate CORS Policy
		let proxy = `https://cors-anywhere.herokuapp.com/`;
		// we now add proxy to our api call

		// we want to use them to determine our location hence we use an api for that
		const api = `${proxy}https://api.darksky.net/forecast/64e5c8c1f939f2c2bb3beb6b468d4935/${latitude},${longitude}`;

		// the var api contains alot of data stored in an obj
		// in order to access the data we use fetch()
		// fetch allows to make server requests without reloading our page
		// without the options,fetch simply is a GET request downloading the contents of our server ie. api
		fetch(api)
		.then((response)=>{
			return response.json(); //parse our data into json
		}).then((data)=>{
			console.log(data); //we encounter a CORS policy problem..CORS allows for webpages/apps to request the 
			 //resources of another webpage ie different origin 
			// modern browsers restrict CORS requests from scripts for security reasons hence the request have to 
			// be of the same origin hence we needed a proxy to navigate this

			// we can access the data we want from our api
			// using object destructuring we import the data to our webapp
			const {summary,icon,temperature} = data.currently;
			const timeZone = data.timezone;

			// modify our DOM elements
			tempModified = temperature + "°F"
			actualLocation.textContent = timeZone;
			actualTemp.textContent = tempModified;
			tempDescription.textContent = summary;

			toCelsius(temperature);
			configIcon(icon,document.querySelector('.icon'));
		});
	});

	// we now want to configure our icon
	function configIcon(icon,iconID){
		// from docs
		const skycons = new Skycons({"color":"white"});
		// change our icon desc to fit the one of skycons
		const currentIcon = icon.replace(/-/g,"_").toUpperCase();
		// play our animation
		skycons.play();

		return skycons.set(iconID,Skycons[currentIcon]);
	}

	// we want our temp. to change from F to Celsius when clicked
	function toCelsius(temperature){
		actualTemp.addEventListener('click',()=>{
			if(actualTemp.textContent === tempModified){
				let tempCelsius = (temperature - 32)*5/9;
				actualTemp.textContent = Math.floor(tempCelsius) + "°C";
			}
			else{
				actualTemp.textContent = tempModified;
			}
		});
	}

});