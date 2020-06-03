#### EX1 _ LED1 delay(500), LED2 delay(700) Toggle

```c
int cnt = 0;
  while (1)
  {
	  if (cnt % 5 == 0) {
	  HAL_GPIO_TogglePin(User_LED1_GPIO_Port, User_LED1_Pin);
	  }
	  if (cnt % 7 == 0) {
	  HAL_GPIO_TogglePin(User_LED2_GPIO_Port, User_LED2_Pin);
	  }
	  cnt++;
	  HAL_Delay(100);
  }
```

