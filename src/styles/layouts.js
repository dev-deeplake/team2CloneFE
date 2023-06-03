
import styled from "styled-components";

export const Flex = styled.div`
    display: flex;
`

export const Flex100 = styled(Flex)`
    width: 100%;
`

export const FlexColumn = styled(Flex)`
    flex-direction: column;
`

export const FlexColumn100 = styled(FlexColumn)`
    width: 100%;
`

export const FlexCenter = styled(Flex)`
    align-content: center;
    justify-content: center;
`

export const FlexCenterRow = styled(Flex)`
    align-items: center;
`

export const FlexCenterRow100 = styled(Flex100)`
    align-items: center;
`

export const FlexCenter100 = styled(Flex100)`
    align-items: center;
    justify-content: center;
`

export const FlexColumnCenter = styled(FlexColumn)`
    align-items: center;
    justify-content: center;
`

export const FlexColumnRowCenter100 = styled(FlexColumn100)`
    align-items: center;
`

export const FlexColumnCenter100 = styled(FlexColumn100)`
    align-items: center;
    justify-content: center;
`

export const FlexColumnForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

