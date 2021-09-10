console.log("JS FILE IS LOADED!!!");
// grab the ui elements
const form = document.getElementById("vote-form");

// Form submit event
form.addEventListener("submit", (e) => {
  const userChoice = document.querySelector(
    "input[name=biryani]:checked"
  ).value;
  const data = { food: userChoice };

  // IIAFE (Immediately Invoked Async Function Expression)
  (async () => {
    try {
      const response = await fetch("http://localhost:3000/poll", {
        method: "post",
        body: JSON.stringify(data),
        headers: new Headers({
          "content-type": "application/json",
        }),
      });
      const jsonResponse = await response.json();
      console.log("resposne -->", jsonResponse);
    } catch (error) {
      console.log(error);
    }
  })();

  e.preventDefault();
});

// Canvas
let dataPoints = [
  { label: "Meghana", y: 0 },
  { label: "Manis", y: 0 },
  { label: "Shanmukha", y: 0 },
  { label: "Paradise", y: 0 },
  { label: "Else", y: 0 },
];

const chartContainer = document.querySelector("#chartContainer");

if (chartContainer) {
  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "theme1",
    title: {
      text: "Results",
    },
    data: [
      {
        type: "column",
        dataPoints,
      },
    ],
  });
  chart.render();

  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

  const pusher = new Pusher("07efca5f2beda425ca35", {
    cluster: "ap2",
  });

  const channel = pusher.subscribe("poll");
  channel.bind("vote", (data) => {
    dataPoints = dataPoints.map((x) => {
      if (x.label === data.food) {
        x.y += data.points;
        return x;
      }
      return x;
    });
    chart.render();
  });
}
