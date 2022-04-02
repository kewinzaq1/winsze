<h1 align="center">

<br>

<p align="center">
<img src=""  alt="Logo">
</p>

<br>

<br>

</h1>

<h4 align="center">winsze - social app</h4>

<p align="center">
  <a >
    <img src=""
         alt="Screenshot">
  </a>
</p>

## Project Overview 🎉

## Tech/framework used 🔧

| Tech             | Description               |
| ---------------- | ------------------------- |
| React            | Base Javascript Framework |
| React Router Dom | Routing                   |
| Emotion          | Styling (css in js)       |
| Material UI      | Styling (components)      |
| React Hot Toast  | Notifications             |

## Screenshots 📺

<p align="center">
    <img src="" alt="Screenshot">
</p>

<p align="center">
    <img src="" alt="Screenshot">
</p>

<p align="center">
    <img src="" alt="Screenshot">
</p>

## Code Example/Issues 🔍

function useLocalStorageState(name, initValue = null) { const
getValueFromLocalStorage = window.localStorage.getItem(name)

const [state, setState] = useState( name !== 'undefined' ?
JSON.parse(getValueFromLocalStorage) : null, )

useEffect(() => { window.localStorage.setItem(name, JSON.stringify(state)) },
[name, state])

return [state, setState] }

## Installation 💾

## Available scripts

| Command         | Description            |     |
| --------------- | ---------------------- | --- |
| `npm run start` | Open local server      |     |
| `npm run build` | Create optimized build |     |
| `npm run test`  | Run tests              |     |

## Live 📍

## License 🔱
