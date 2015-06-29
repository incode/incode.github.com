#include <stdio.h>
#include <stdlib.h>

int main(int argc, char **argv)
{
  const char *fn = argv[1];
  char str[4096];
  FILE *fp = fopen(fn, "a+");

  if(fp == NULL) 
    exit(EXIT_FAILURE);

  //inetd passes its information to us in stdin.
  while(fgets(str, sizeof(str), stdin)) {
    fputs(str, fp);
    fflush(fp);
  }

  fclose(fp);

  return 0;
}
