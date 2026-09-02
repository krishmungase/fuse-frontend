/**
 * Auth arrangement: brand illustration on the left from `lg` up, form column on
 * the right. Below `lg` — or when no illustration is supplied — the form
 * centres on its own.
 *
 * An illustration must be a PNG with a real alpha channel; anything exported on
 * a white matte reads as a white rectangle against the dark surface.
 */
const AuthSplit = ({ illustration, children }) => {
  return (
    <div className="flex items-center justify-center gap-10 xl:gap-16">
      {illustration ? (
        <>
          <div className="hidden flex-1 justify-center lg:flex">
            <img
              src={illustration}
              alt=""
              aria-hidden
              draggable={false}
              className="w-full max-w-[460px] select-none"
            />
          </div>

          <div className="hidden h-[380px] w-px shrink-0 bg-chat-border lg:block" />
        </>
      ) : null}

      <div className="mx-auto flex w-full max-w-[400px] shrink-0 flex-col items-center lg:mx-0">
        <img
          src="/fuse-logo.png"
          alt="Fuse AI"
          draggable={false}
          className="h-9 w-auto shrink-0 select-none"
        />

        {children}
      </div>
    </div>
  )
}

export default AuthSplit
