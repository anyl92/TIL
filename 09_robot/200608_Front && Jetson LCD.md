### 200608_Front && Jetson LCD



emotion css 적용방법

```tsx
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const Button = css`
  /* position: absolute; */
  /* margin-top: 70%; */
  font-size: 14px;
  font-weight: 600;
`
<button
	css={Button}
>
        
<div
	css={css`
		display: flex;
		justify-content: flex-end;
	`}
>
```



부팅 시 키오스크 모드 크롬 오픈

```bash
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install xscreensaver | xscreensav * -y
sudo apt-get install ubuntu-restricted-extras -y
sudo vi /usr/share/xsessions/kiosk.desktop
sudo vi /sur/share/xsessions/chromeKiosk.sh
sudo chmod 755 /usr/share/xsessions/chromeKiosk.sh
```

`kiosk.desktop`

```
[Desktop Entry]
Encoding = UTF-8
Name = Kiosk Mode
Comment = Chromium Kiosk Mode
Exec = / usr / share / xsessions / chromeKiosk.sh
Type = Application
```

`chromeKiosk.sh`

```
#!/bin/bash
xscreensaver -nosplash &
cat ~/.config/chromium/Local\ State | perl -pe "s/\"bottom.*/\"bottom\": $(xrandr | grep \* | cut -d' ' -f4 | cut -d'x' -f2),/" > ~/.config/chromium/Local\ State
cat ~/.config/chromium/Local\ State | perl -pe "s/\"right.*/\"right\": $(xrandr | grep \* | cut -d' ' -f4 | cut -d'x' -f1),/" > ~/.config/chromium/Local\ State
while true; do chromium-browser %u --start-maximized; sleep 5s; done
```

