import {BridgedEventTimestampBuilder} from '../../BridgedEventTimestamp';

import State, {StateProps} from './State';

type FlowType = 'app_boot' | 'flow_start' | 'flow_reset';

export interface StartedProps extends StateProps {
  sourceScreen: string | undefined;
  type: FlowType;
}

export default class Started extends State {
  static readonly STATE_NAME = 'Started';
  readonly sourceScreen: string | undefined;
  readonly type: FlowType;

  constructor({sourceScreen, type, ...rest}: StartedProps) {
    super(rest);
    this.sourceScreen = sourceScreen;
    this.type = type;
  }

  getStateName() {
    return Started.STATE_NAME;
  }

  updateState(newDestinationScreen: string, newComponentInstanceId: string, oldComponentInstanceId: string) {
    if (oldComponentInstanceId === '__unknown_destination_screen__') {
      const time = new BridgedEventTimestampBuilder().build();

      return new Started({
        timestamp: time,
        componentInstanceId: newComponentInstanceId,
        snapshotId: this.snapshotId,
        previousState: this.previousState,
        type: this.type,
        sourceScreen: this.sourceScreen,
        destinationScreen: newDestinationScreen,
      });
    }

    return new Started({
      timestamp: this.timestamp,
      componentInstanceId: newComponentInstanceId,
      snapshotId: this.snapshotId,
      previousState: this.previousState,
      type: this.type,
      sourceScreen: this.sourceScreen,
      destinationScreen: newDestinationScreen,
    });
  }

  protected cloneAsChild(): Started {
    return new Started({
      timestamp: this.timestamp,
      componentInstanceId: this.componentInstanceId,
      destinationScreen: this.destinationScreen,
      snapshotId: this.snapshotId,
      type: this.type,
      sourceScreen: this.sourceScreen,
      previousState: this,
    });
  }

  protected toSimpleJson() {
    return {
      ...super.toSimpleJson(),
      sourceScreen: this.sourceScreen,
      type: this.type,
    };
  }
}
