import { Hello } from "./services/advertisement.service";

function App() {
  Hello().then((res) => console.log(res));

  return (
    <>
      <div>
        <p>
          Hello !
        </p>
      </div>
    </>
  );
}

export default App;
