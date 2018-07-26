import { Injectable } from '@angular/core';
declare var noty: any;

@Injectable()
export class Notification {

	constructor() { }

	public static notySuccessMessage(message: string) {
		noty({
			text: message,
			type: 'success',
			dismissQueue: true,
			theme: 'agileUI',
			layout: 'top',
			timeout: 4000
		});
	}

	public static notyErrorMessage(message: string) {
		noty({
			text: message,
			type: 'error',
			dismissQueue: true,
			theme: 'agileUI',
			layout: 'top',
			timeout: 4000
		});
	}

	public static notyConfirmMessage(message: string, callback: () => any) {
		noty({
			text: message,
			type: 'information',
			layout: 'center',
			theme: 'agileUI',
			buttons: [
				{
					addClass: 'btn btn-primary', text: 'Ok', onClick: function($noty: any) {
						$noty.close();
						callback();
					}
				},
				{
					addClass: 'btn btn-danger', text: 'Cancel', onClick: function($noty: any) {
						$noty.close();
					}
				}
			]
		});
	}

	public static toastSuccessMessage(message: string) {
		(<any>$).jGrowl(message, {
			sticky: false,
			position: 'bottom-right',
			theme: 'bg-green'
		});
	}

	public static toastErrorMessage(message: string) {
		(<any>$).jGrowl(message, {
			sticky: false,
			position: 'bottom-right',
			theme: 'bg-red'
		});
	}
}

