export default function AvatarTeacher({ state = "idle" }) {
  return (
    <div className={`avatar-wrapper ${state}`}>
      <div className="avatar-head">
        <div className="avatar-hair"></div>

        <div className="avatar-eyes">
          <span></span>
          <span></span>
        </div>

        <div className="avatar-glasses">
          <div></div>
          <div></div>
        </div>

        <div className="avatar-mouth"></div>

        <div className="avatar-cheeks">
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="avatar-body"></div>

      <p className="avatar-status">
        {state === "talking" && "Falando..."}
        {state === "listening" && "Ouvindo..."}
        {state === "thinking" && "Pensando..."}
        {state === "idle" && "Pronta para aula"}
      </p>
    </div>
  );
}