# 201008_Gazebo, WSL2

## Gazebo

현재 9.x 가 LTS 버전 (11.x 버전이 릴리즈 되었으나, 차기 ROS 배포판와 연동 예정)

ros-melodic-desktop-full을 설치하면 9.0 버전이 설치됨. (초기버전)

최근 업데이트된 패키지를 받으려면, gazebosim 레포지토리를 추가해야 함.

```bash
$ sudo sh -c 'echo "deb <http://packages.osrfoundation.org/gazebo/ubuntu-stable> `lsb_release -cs` main" > /etc/apt/sources.list.d/gazebo-stable.list'
$ wget <http://packages.osrfoundation.org/gazebo.key> -O - | sudo apt-key add -
$ sudo apt update
$ sudo apt upgrade
```

Gazebo 실행

```bash
$ roslaunch gazebo_ros empty_world.launch
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f005f493-cc48-4842-b394-9b8acfc5146e/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f005f493-cc48-4842-b394-9b8acfc5146e/Untitled.png)

음. 나는 GUI가 없는데.. 이게 나오나?



## WSL2 (Windows Subsystem for Linux 2)

[Setting up ROS in Windows through WSL2](https://jack-kawell.com/2020/06/12/ros-wsl2/)

관리자 권한으로 PowerShell 실행

```bash
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

설치 후 재부팅

[WSL 2 Linux 커널 업데이트](https://docs.microsoft.com/ko-kr/windows/wsl/wsl2-kernel)

여기서 msi 파일 받아서 실행했음

그리고 MicroSoft Store 에서 Ubuntu 18.04 다운 후 설치

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f927bb57-47ae-45f0-be1a-c6ff63e8ef2a/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f927bb57-47ae-45f0-be1a-c6ff63e8ef2a/Untitled.png)