import { Link } from 'react-router'

/** "Don't have an account? Sign up" style footer beneath an auth form. */
const AuthSwitchLink = ({ prompt, to, label }) => {
  return (
    <p className="pt-6 text-center text-[14px] text-chat-secondary">
      {prompt}{' '}
      <Link
        to={to}
        className="text-chat-foreground transition-colors duration-150 hover:underline"
      >
        {label}
      </Link>
    </p>
  )
}

export default AuthSwitchLink
