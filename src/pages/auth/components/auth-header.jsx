/** Page title and supporting line above an auth form. */
const AuthHeader = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center pt-8 pb-8 text-center">
      <h1 className="text-[30px] leading-tight font-light tracking-tight text-chat-foreground">
        {title}
      </h1>
      <p className="pt-2 text-[14px] text-chat-secondary">{subtitle}</p>
    </div>
  )
}

export default AuthHeader
