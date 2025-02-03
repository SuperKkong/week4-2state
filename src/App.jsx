import { useState } from 'react';

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editState, setEditState] = useState({ index: null, text: "" });
  const [filter, setFilter] = useState('all'); // all, active, completed
  
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        text: newTask,
        completed: false,
        timestamp: new Date().toLocaleString(),
        priority: 'normal'
      }]);
      setNewTask("");
    }
  }

  const toggleComplete = (index) => {
    setTasks(tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    ));
  }

  const editTask = (index) => {
    setEditState({
      index,
      text: tasks[index].text
    });
  }

  const saveEdit = () => {
    if (editState.text.trim()) {
      setTasks(tasks.map((task, i) => 
        i === editState.index 
          ? { ...task, text: editState.text }
          : task
      ));
      setEditState({ index: null, text: "" });
    }
  }

  const setPriority = (index, priority) => {
    setTasks(tasks.map((task, i) => 
      i === index ? { ...task, priority } : task
    ));
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'high': return 'bg-danger bg-opacity-10';
      case 'low': return 'bg-success bg-opacity-10';
      default: return 'bg-light';
    }
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 text-primary fw-bold">
        ✨ ระบบจัดการงาน
      </h1>

      {/* Input section */}
      <div className="row mb-4">
        <div className="col">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="เพิ่มงานใหม่..."
            />
            <button
              className="btn btn-primary"
              onClick={addTask}
            >
              เพิ่มงาน
            </button>
          </div>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="btn-group mb-4">
        <button
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('all')}
        >
          ทั้งหมด
        </button>
        <button
          className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('active')}
        >
          ยังไม่เสร็จ
        </button>
        <button
          className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('completed')}
        >
          เสร็จแล้ว
        </button>
      </div>

      {/* Tasks list */}
      <div className="card">
        <div className="card-body p-0">
          {filteredTasks.map((task, index) => (
            <div
              key={index}
              className={`p-3 border-bottom ${getPriorityClass(task.priority)}`}
            >
              {editState.index === index ? (
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    value={editState.text}
                    onChange={(e) => setEditState({ ...editState, text: e.target.value })}
                  />
                  <button
                    className="btn btn-success"
                    onClick={saveEdit}
                  >
                    บันทึก
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setEditState({ index: null, text: "" })}
                  >
                    ยกเลิก
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={task.completed}
                      onChange={() => toggleComplete(index)}
                    />
                  </div>
                  <div className="ms-3 flex-grow-1">
                    <div className={task.completed ? 'text-decoration-line-through text-muted' : ''}>
                      {task.text}
                    </div>
                    <small className="text-muted">
                      {task.timestamp}
                    </small>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <select
                      className="form-select form-select-sm"
                      value={task.priority}
                      onChange={(e) => setPriority(index, e.target.value)}
                      style={{ width: 'auto' }}
                    >
                      <option value="low">ความสำคัญต่ำ</option>
                      <option value="normal">ความสำคัญปกติ</option>
                      <option value="high">ความสำคัญสูง</option>
                    </select>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => editTask(index)}
                    >
                      แก้ไข
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => setTasks(tasks.filter((_, i) => i !== index))}
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Empty state */}
          {filteredTasks.length === 0 && (
            <div className="text-center py-5 text-muted">
              ไม่มีงานที่ต้องทำ
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;