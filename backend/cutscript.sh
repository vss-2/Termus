for namefile in *.m4a
do
	ffmpeg -ss 1 -i $namefile './new/'$namefile
done
