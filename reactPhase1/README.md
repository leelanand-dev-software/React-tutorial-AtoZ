# React Fundamentals: Tier 1

This guide explains the first React ideas using the learning task board in `src/App.jsx`. Read the examples in the app alongside these definitions.

## The main mental model: UI = f(state)

The screen is the result of a function of the current state. In other words, React reads the component's props and state, then describes what the UI should look like. When state changes, React runs the component again and updates the parts of the screen that need to change. You normally describe the desired UI; React handles updating the browser DOM.

For example, when a task changes from `done: false` to `done: true`, React renders its checked checkbox, “Done” label, and the updated progress count from that new task data.

## 1. JSX

**JSX** is a syntax that lets you write markup-like descriptions inside JavaScript. It looks similar to HTML, but it follows JavaScript and React rules: use `className` instead of `class`, close tags, and put JavaScript expressions inside `{}`.

```jsx
<h1>Think in <span>state.</span></h1>
<p>{completedCount} tasks complete</p>
```

JSX is not HTML text that React copies directly; build tools transform it into JavaScript instructions that React can use to create the UI.

## 2. Components

A **component** is a reusable piece of UI, usually written as a JavaScript function whose name starts with a capital letter. It returns JSX describing what should appear.

```jsx
function TaskItem({ task }) {
  return <li>{task.text}</li>
}
```

The app has `App`, `TaskBoard`, and `TaskItem` components. Breaking a screen into components makes each part easier to understand, reuse, and change.

## 3. Props

**Props** are inputs passed from a parent component to a child component. A child reads props to decide what to show or do. Props are read-only: a child should not change the props it receives.

```jsx
<TaskItem task={task} onToggle={toggleTask} />
```

Here, `TaskBoard` passes a task and a callback to `TaskItem`. The child can call `onToggle`, while the parent owns and updates the task state.

## 4. State

**State** is data a component remembers between renders. Use React state when changing a value should change what the user sees. The `useState` Hook gives you the current value and a setter function.

```jsx
const [draft, setDraft] = useState('')
```

`draft` is the current input text; `setDraft` requests a state update. Do not change state directly (for example, do not push into the existing `tasks` array). Create and set a new value instead. React may group updates and schedule rendering, so a setter does not mean the DOM changes immediately on that exact line.

## 5. Event handling

**Event handling** means responding to something the user does, such as typing, submitting a form, or checking a box. In React, you pass a function to an event prop such as `onChange`, `onSubmit`, or `onClick`.

```jsx
<input onChange={(event) => setDraft(event.target.value)} />
```

Pass the function itself (`onSubmit={addTask}`), so React can call it when the event happens. Writing `onSubmit={addTask()}` would call it during rendering instead.

## 6. Conditional rendering

**Conditional rendering** means choosing which JSX to show based on a condition. You can use a ternary for one of two results or `&&` when something should appear only when a condition is true.

```jsx
{tasks.length === 0
  ? <p>No tasks yet.</p>
  : <ul>{/* task rows */}</ul>}
```

The task board shows the empty message when there are no tasks; otherwise it shows the list. A task's status text also depends on whether it is complete.

## 7. Lists and keys

A **list** is commonly rendered by transforming an array with JavaScript's `.map()`. Each rendered item needs a **key**: a stable, unique value that lets React match each item with the same item after the list changes.

```jsx
{tasks.map((task) => (
  <TaskItem key={task.id} task={task} onToggle={toggleTask} />
))}
```

Use an item's stable ID for its key. Avoid array indexes when items can be added, removed, or reordered, because React could associate the wrong row with changed data. `key` is special React information and is not passed to the component as a prop.

## 8. Component composition

**Component composition** means building a larger interface by putting smaller components together. A parent can render children and pass them the data and callbacks they need.

In this app, `App` composes the page from sections and renders `TaskBoard`; `TaskBoard` composes the task interface from a form and many `TaskItem` components. This keeps each component focused on one part of the UI.

## 9. Controlled vs. uncontrolled components

These terms describe who is in charge of a form field's current value.

- A **controlled input** gets its value from React state and updates that state through an event handler. React is the source of truth.
- An **uncontrolled input** keeps its current value in the browser DOM. You can read it when needed with a ref or when the form is submitted; React does not store each keystroke in state.

The task form uses a controlled input: `value={draft}` displays the state, and `onChange` calls `setDraft`. For an uncontrolled input, you might use `defaultValue` and a ref to read the value later. Controlled inputs are useful when the UI needs to respond to the field as the user types, such as validation or a live preview.

## 10. Forms

A **form** groups inputs and provides a standard way to submit them. In React, handle the form's `onSubmit` event. Call `event.preventDefault()` when you want to stop the browser's default page reload and handle submission in your component.

```jsx
<form onSubmit={addTask}>
  <input value={draft} onChange={handleChange} />
  <button type="submit">Add task</button>
</form>
```

The task board trims the submitted text, ignores an empty task, adds a new task to state, and clears the input. A real form may also need labels, validation, helpful error messages, and a clear success state.

## How the task board connects the ideas

1. You type in the controlled input. Its `onChange` event updates `draft` state.
2. You submit the form. Its event handler adds a task to `tasks` state.
3. React renders `TaskBoard` again using the new state.
4. `.map()` creates one `TaskItem` per task, each identified by its stable key.
5. Each `TaskItem` receives its task and toggle callback as props.
6. Checking a task updates state immutably. The checkbox, status, and progress count are recalculated from that state.

That is **UI = f(state)** in practice: the UI describes the current data, and a state update leads React to render the description again.

## Run the lesson

```bash
npm install
npm run dev
```

Open the local address printed by Vite, add a learning topic, and mark it complete. Then compare what you see with the component code in `src/App.jsx`.
