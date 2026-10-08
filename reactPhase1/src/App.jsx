import { useState } from 'react'
import './App.css'

const starterTasks = [
  { id: 1, text: 'Learn what JSX describes', done: true },
  { id: 2, text: 'Explain why state changes trigger a render', done: false },
]

function TaskItem({ task, onToggle }) {
  return (
    <li className={`task-item ${task.done ? 'is-done' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.text}</span>
      </label>
      <span className="task-status">{task.done ? 'Done' : 'In progress'}</span>
    </li>
  )
}

function TaskBoard() {
  const [tasks, setTasks] = useState(starterTasks)
  const [draft, setDraft] = useState('')
  const completedCount = tasks.filter((task) => task.done).length

  function addTask(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), text, done: false },
    ])
    setDraft('')
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    )
  }

  return (
    <section className="board" aria-labelledby="board-title">
      <div className="board-heading">
        <div>
          <p className="eyebrow">React fundamentals · hands-on</p>
          <h2 id="board-title">Your learning tasks</h2>
        </div>
        <p className="progress" aria-live="polite">
          {completedCount} of {tasks.length} complete
        </p>
      </div>

      <form className="task-form" onSubmit={addTask}>
        <label className="sr-only" htmlFor="new-task">New learning task</label>
        <input
          id="new-task"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add a React topic to practise..."
        />
        <button type="submit">Add task</button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty-state">No tasks yet. Add one above to get started.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} />
          ))}
        </ul>
      )}
    </section>
  )
}

function App() {
  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">A practical React lesson</p>
        <h1>Think in <span>state.</span></h1>
        <p className="hero-copy">
          React builds the screen from data. Change the data, and React renders
          the UI again to match it.
        </p>
        <div className="model"><code>UI = f(state)</code><span>Same state, same UI. New state, updated UI.</span></div>
      </header>

      <TaskBoard />

      <section className="concepts" aria-labelledby="concepts-title">
        <div className="section-heading">
          <p className="eyebrow">What you are practising</p>
          <h2 id="concepts-title">One component, many fundamentals</h2>
        </div>
        <div className="concept-grid">
          <article className="concept-card"><span>01</span><h3>JSX & components</h3><p>JSX describes the UI. <code>App</code>, <code>TaskBoard</code>, and <code>TaskItem</code> are reusable component functions.</p></article>
          <article className="concept-card"><span>02</span><h3>Props & composition</h3><p><code>TaskBoard</code> gives each <code>TaskItem</code> its task and an event callback through props.</p></article>
          <article className="concept-card"><span>03</span><h3>State & rendering</h3><p><code>tasks</code> and <code>draft</code> are state. Calling a setter schedules a render so JSX can reflect the latest values.</p></article>
          <article className="concept-card"><span>04</span><h3>Events & forms</h3><p><code>onChange</code>, <code>onSubmit</code>, and <code>onClick</code>-style handlers respond to what you do.</p></article>
          <article className="concept-card"><span>05</span><h3>Lists, keys & conditions</h3><p><code>map</code> creates rows with stable keys; conditional rendering shows an empty message or the task list.</p></article>
          <article className="concept-card"><span>06</span><h3>Controlled input</h3><p>The input's value comes from React state, and <code>onChange</code> updates that state. This is a controlled component.</p></article>
        </div>
      </section>

      <aside className="note"><strong>Try this:</strong> add a topic, mark it complete, and watch the progress count update. Each action changes state; React calls the component again and updates the parts of the page that changed.</aside>
      <footer>Start with the mental model. Build understanding one interaction at a time.</footer>
    </main>
  )
}

export default App
