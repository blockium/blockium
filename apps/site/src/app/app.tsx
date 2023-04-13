import { Hero } from '@postgpt/commonui';
// import { firebase } from '@postgpt/firebase';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

console.log(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID);
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
// console.log(firebase);

export function App() {
  return (
    <>
      <h1>Post GPT</h1>
      <Hero />
      <div />
    </>
  );
}

export default App;
