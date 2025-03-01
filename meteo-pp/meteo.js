document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "654c83f00b808008e62b2110dfa27deb";
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const cities = [
    "Valenciennes",
    "Rouvignies",
    "Lourches",
    "Denain",
    "Douchy-les-Mines",
    "gap",
    "Lourches",
  ];

  let cityIndex = 0;

  async function getWeather(city) {
    try {
      const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        console.error("Erreur API :", data.message);
        return;
      }

      document.getElementById("city").textContent = data.name;
      document.getElementById(
        "temperature"
      ).textContent = `${data.main.temp}°C`;
      document.getElementById("description").textContent =
        data.weather[0].description;
      document.getElementById(
        "icon"
      ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données météo :",
        error
      );
    }
  }

  function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    document.getElementById(
      "time"
    ).textContent = `Heure actuelle : ${timeString}`;
  }

  function changeCity() {
    getWeather(cities[cityIndex]);
    cityIndex = (cityIndex + 1) % cities.length;
  }

  updateTime();
  setInterval(updateTime, 1000);

  changeCity();
  setInterval(changeCity, 10000);
});
