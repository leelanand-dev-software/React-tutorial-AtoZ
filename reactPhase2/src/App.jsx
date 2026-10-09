import { useState } from "react";

const topics = [
  [
    "11",
    "Render phase vs commit phase",
    "During render, React calls components to calculate the next UI. During commit, React applies the necessary changes to the DOM and runs effects at their defined time. Render work can be repeated or discarded, so keep render pure: no DOM mutations, subscriptions, or other side effects in the component body.",
    "Render answers “what should the UI look like?” Commit makes that result visible.",
  ],
  [
    "12",
    "Re-rendering",
    "A state update schedules React to call the component again. A re-render means React recalculates a component’s output; it does not mean React throws away and recreates the whole DOM. A parent render can also cause children to be rendered again.",
    "State update → render calculation → reconciliation → commit if needed.",
  ],
  [
    "13",
    "Reconciliation",
    "React compares the new element tree with the previous one. It uses element type, position, and keys to decide what can be reused and what must be inserted, updated, or removed. Reconciliation is the comparison and planning work; DOM updates happen during commit.",
    "Stable keys help React match list items across renders.",
  ],
  [
    "14",
    "Virtual DOM",
    "JSX describes React elements: lightweight JavaScript objects representing the UI you want. People often call this description the virtual DOM. React compares descriptions and updates the real DOM where needed. It is not a second browser DOM that is always copied wholesale.",
    "Think “UI description,” not “the browser DOM, but virtual.”",
  ],
  [
    "15",
    "Component lifecycle",
    "A function component can render many times. Effects can start synchronization after a commit and clean it up before re-running or when the component is removed. For function components, think in terms of rendering and effect synchronization instead of memorizing old class lifecycle method names.",
    "useEffect(() => { connect(); return () => disconnect() }, [roomId])",
  ],
  [
    "16",
    "State as a snapshot",
    "Each render receives a fixed snapshot of state. Event handlers created by that render close over that snapshot. Calling a setter requests a future render; it does not change the state variable in the already-running handler.",
    "If this render sees count = 0, count remains 0 throughout this click handler.",
  ],
  [
    "17",
    "Batching of state updates",
    "React groups state updates made during an event so it can render efficiently. With the same snapshot, two setCount(count + 1) calls both request the value 1 when count is 0. The final state is 1, not 2. Batching does not mean React combines the expressions into arithmetic.",
    "Both expressions read the same count snapshot.",
  ],
  [
    "18",
    "Functional state updates",
    "Pass a function when the next value depends on the previous queued value. React applies updater functions in order: c => c + 1, then c => c + 1. Starting from 0, the final value is 2. Updaters should be pure; React may call them more than once in development to find accidental impurities.",
    "Use setCount(c => c + 1) for repeated increments or updates based on prior state.",
  ],
  [
    "19",
    "State immutability",
    "Treat objects and arrays held in state as read-only. Make a new object or array when changing data so React can see a new reference and previous snapshots remain intact. Mutating an object and passing back the same reference can be ignored and also changes data seen by earlier code.",
    'setUser(user => ({ ...user, name: "Ada" }))',
  ],
  [
    "20",
    "Preserving vs resetting state",
    "React associates state with a component’s place in the rendered tree, its component type, and its key. Keeping those stable preserves state. Changing the type or key, or removing the component, gives it a new identity and resets its state.",
    "<Profile key={userId} userId={userId} /> resets Profile state when userId changes.",
  ],
];

function Section({ number, title, children }) {
  return (
    <section className="topic">
      <span className="topic-number">{number}</span>
      <div>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
    </section>
  );
}

function ProfileEditor() {
  const [profile, setProfile] = useState({ name: "Ada", city: "London" });
  return (
    <div className="mini-demo">
      <label>
        Name{" "}
        <input
          value={profile.name}
          onChange={(event) =>
            setProfile((current) => ({ ...current, name: event.target.value }))
          }
        />
      </label>
      <p className="muted">
        Immutable update: copy the old object, then replace <code>name</code>.
        City stays {profile.city}.
      </p>
    </div>
  );
}

function CounterLesson() {
  const [count, setCount] = useState(0);
  const [lastHandlerValue, setLastHandlerValue] = useState(null);

  function incrementDirectly() {
    const snapshot = count;
    setCount(count + 1);
    setCount(count + 1);
    setLastHandlerValue(snapshot);
  }

  function incrementFunctionally() {
    const snapshot = count;
    setCount((current) => current + 1);
    setCount((current) => current + 1);
    setLastHandlerValue(snapshot);
  }

  return (
    <section className="counter-card">
      <div className="counter-top">
        <span className="eyebrow">TRY IT · BATCHING + SNAPSHOTS</span>
        <button
          className="reset"
          onClick={() => {
            setCount(0);
            setLastHandlerValue(null);
          }}
        >
          Reset
        </button>
      </div>
      <div className="count-line">
        <span className="count">{count}</span>
        <span className="count-label">current count after commit</span>
      </div>
      <div className="actions">
        <button className="button secondary" onClick={incrementDirectly}>
          Two direct updates
        </button>
        <button className="button primary" onClick={incrementFunctionally}>
          Two functional updates
        </button>
      </div>
      <div className="code-grid">
        <div>
          <strong>Same snapshot twice</strong>
          <pre>
            <code>{"setCount(count + 1);\nsetCount(count + 1);"}</code>
          </pre>
          <p>
            Both read the same <code>count</code>; from 0, the result is 1.
          </p>
        </div>
        <div>
          <strong>Apply updates in sequence</strong>
          <pre>
            <code>{"setCount(c => c + 1);\nsetCount(c => c + 1);"}</code>
          </pre>
          <p>
            Each updater receives the previous queued result; from 0, the result
            is 2.
          </p>
        </div>
      </div>
      <p className="snapshot-note">
        This click handler's snapshot was <b>{lastHandlerValue ?? "—"}</b>.
        Setters request a later render; the handler keeps its original value.
      </p>
    </section>
  );
}

function App() {
  return (
    <main className="page">
      <header className="hero">
        <span className="eyebrow">REACT A TO Z · PHASE 2</span>
        <h1>
          React’s core
          <br />
          <em>mental model</em>
        </h1>
        <p>
          Understand how React calculates UI, queues state, and decides what to
          preserve. These ideas make hooks easier to reason about.
        </p>
      </header>
      <CounterLesson />
      <section className="topics">
        <div className="section-heading">
          <span className="eyebrow">THE TEN IDEAS</span>
          <h2>From state update to screen</h2>
        </div>
        {topics.map(([number, title, explanation, takeaway]) => (
          <Section key={number} number={number} title={title}>
            {
              <>
                {explanation}
                <span className="takeaway">{takeaway}</span>
              </>
            }
          </Section>
        ))}
      </section>
      <section className="immutability">
        <div>
          <span className="eyebrow">STATE IS READ ONLY</span>
          <h2>Make a new value when data changes</h2>
          <p>
            Try editing the name. The update creates a new object instead of
            changing the existing state object.
          </p>
        </div>
        <ProfileEditor />
      </section>
      <footer>
        One useful loop to remember:{" "}
        <b>render from a snapshot → queue updates → reconcile → commit</b>.
      </footer>
    </main>
  );
}

export default App;
