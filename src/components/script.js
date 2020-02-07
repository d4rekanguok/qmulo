import vhtml from '_vhtml'

export const Script = ({ props, children }) => (
  <script {...props} dangerouslySetInnerHTML={{
    __html: children
  }} />
)