# React A to Z — Phase 2: React’s core mental model

This phase teaches how React turns state and component descriptions into a screen. The interactive lesson lives in `src/App.jsx`; run it with `npm run dev`.

## Learning goals (topics 11–20)

11. Render phase vs commit phase  
12. Re-rendering  
13. Reconciliation  
14. Virtual DOM  
15. Component lifecycle  
16. State as a snapshot  
17. Batching of state updates  
18. Functional state updates  
19. State immutability  
20. Preserving vs resetting state

## The central loop

A function component describes UI for the props and state of one render. When state changes, React schedules work. React calls the component to calculate a new description (render), compares it with the previous description (reconciliation), then applies necessary DOM changes (commit). Effects synchronize with external systems after a commit. Rendering may be repeated, so render code and state updater functions should be pure.

### Render phase vs commit phase

- **Render:** React calls components and computes the next element tree. Do not mutate the DOM, subscribe, or perform other side effects here.
- **Commit:** React applies required DOM changes. Effects run in their documented timing relative to commit and paint.

A render can produce the same UI and require no DOM changes. Re-rendering is not the same as rebuilding the entire page.

### Re-rendering, reconciliation, and the virtual DOM

A state update schedules the owning component to render again. A parent render may also render its children. During reconciliation React compares the new element descriptions with the prior tree and determines which component instances and DOM nodes can be reused, updated, inserted, or removed. Type, position, and keys affect matching.

“Virtual DOM” is a common name for React's in-memory element descriptions. JSX becomes element objects; it is not a duplicate browser DOM that React blindly copies to the page. React uses its tree and reconciliation process to calculate the DOM work needed.

### Component lifecycle

Function components can render repeatedly. An effect is for synchronizing with something outside React, such as a connection or browser API. Its cleanup runs before that effect is set up again and when the component is removed:

```jsx
useEffect(() => {
  const connection = connectToRoom(roomId)
  return () => connection.disconnect()
}, [roomId])
```

Keep the component body pure. Do not treat an effect as a general “after every render” callback; choose dependencies to describe what the effect synchronizes with.

## The essential state example

State is a **snapshot** supplied to a particular render. A setter queues a future state value; it does not mutate the variable in the current handler. React batches updates made during an event, so the following calls both read the same `count` snapshot:

```jsx
// Suppose this handler's render sees count === 0
setCount(count + 1) // queues 1
setCount(count + 1) // also queues 1
// Next rendered count: 1
```

Use an updater function when each update should use the latest queued value:

```jsx
setCount(c => c + 1) // 0 becomes 1
setCount(c => c + 1) // 1 becomes 2
// Next rendered count: 2
```

React processes updater functions in order. They must be pure: given the same input, return the same output without side effects. In development, Strict Mode may call render logic and updater functions more than once to expose impurities; the committed result still reflects the queued updates.

A handler's local variable remains its original snapshot even after calling a setter:

```jsx
function handleClick() {
  setCount(count + 1)
  console.log(count) // current render's value, not the queued value
}
```

The interactive counter in this phase lets you compare both forms directly.

## State immutability

Treat state objects and arrays as read-only. Create a new value to express a change:

```jsx
setProfile(profile => ({ ...profile, name: 'Ada' }))
setItems(items => items.map(item =>
  item.id === changedId ? { ...item, done: true } : item
))
```

Avoid mutating and reusing the same reference:

```jsx
// Wrong: mutates the existing object
profile.name = 'Ada'
setProfile(profile)
```

New references preserve earlier render snapshots and make state changes detectable. Copy nested objects along the path being changed; a shallow spread alone does not copy nested data.

## Preserving or resetting state

React associates state with a component's identity at a position in the rendered tree. If the type and key remain stable, state is generally preserved. Removing a component, changing its type, or changing its key creates a new identity and resets its state.

```jsx
<ProfileEditor key={userId} userId={userId} />
```

When `userId` changes, the key changes and React creates a fresh `ProfileEditor` state. Keys are an intentional tool for identity and reset behavior, as well as for matching list items.

## Practice

1. Click **Two direct updates** from zero. Why does the value change by one?
2. Click **Two functional updates** from zero. What value does each updater receive?
3. Read `lastHandlerValue` in the demo. Why does it show the value from before the click?
4. Edit the profile name. Which object reference changed? Why does the city remain?
5. Imagine a child with local state rendered for two user IDs. Should that state carry over? Try using the user ID as its `key` and explain the result.

## Mental model to recall

**Render from a snapshot → queue state updates → reconcile descriptions → commit DOM changes.** Use functional updates when the next state depends on the previous queued state, immutable updates for objects and arrays, and stable component identity when state should be preserved.
