import { COLOR_CODE } from '@core/common';
import { IShape } from '@design/types';
import { ActionIcon, Flex, InputWrapper } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IoIosAdd as IncreaseIcon } from 'react-icons/io';
import { RiSubtractFill as DecreaseIcon } from 'react-icons/ri';

type Props = {
  selectedShape: IShape;
  onChange: (key: string, value: any) => void;
};

const BASE_FONT_SIZE = 16;

const FontSizeConfiguration = ({ selectedShape, onChange }: Props) => {
  const [fontSize, setFontSize] = useState<number>(
    BASE_FONT_SIZE * (selectedShape.attrs.scaleX || 1),
  );

  useEffect(() => {
    onChange('scale', {
      x: 1 * (fontSize / BASE_FONT_SIZE),
      y: 1 * (fontSize / BASE_FONT_SIZE),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontSize]);

  useEffect(() => {
    setFontSize(
      parseFloat((BASE_FONT_SIZE * selectedShape.attrs?.scaleX || BASE_FONT_SIZE).toFixed()),
    );
  }, [selectedShape.attrs.scaleX]);

  return (
    <InputWrapper label="Font Size">
      <Flex
        align="center"
        style={{
          borderRadius: 8,
          width: 'fit-content',
          border: COLOR_CODE.BORDER_DEFAULT,
        }}
      >
        <ActionIcon
          variant="subtle"
          c="dark"
          size="xl"
          disabled={fontSize === 1}
          onClick={() => setFontSize((prev) => prev - 1)}
        >
          <DecreaseIcon size={20} color={COLOR_CODE.GRAY_800} />
        </ActionIcon>
        <Flex
          align="center"
          py={8}
          px={16}
          style={{
            fontWeight: '500',
          }}
        >
          {fontSize}
        </Flex>
        <ActionIcon
          variant="subtle"
          c="dark"
          size="xl"
          onClick={() => setFontSize((prev) => prev + 1)}
        >
          <IncreaseIcon size={20} color={COLOR_CODE.GRAY_800} />
        </ActionIcon>
      </Flex>
    </InputWrapper>
  );
};

export default FontSizeConfiguration;
