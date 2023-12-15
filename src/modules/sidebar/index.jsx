import { Items } from "./SidebarData";

const Sidebar = ({ setDraggedItem }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">BLOCKS</div>
      <div className="sidebar-items">
        {Items.map((item) => (
          <div
            key={`Item-${item.Id}`}
            className="sidebar-item"
            draggable //enable div as a draggable
            onDragStart={(e) =>
              setDraggedItem({
                ...item,
                x: e.clientX - e.currentTarget.getBoundingClientRect().left,
                y: e.clientY - e.currentTarget.getBoundingClientRect().top,
              })
            } //item being dragged
          >
            {item.Name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
