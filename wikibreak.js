/*** BEGIN WIKIBREAK ENFORCER ***/
$(document).ready(function() 
{

	/*** Start editing here ***/

	// When you want to end your break?
	// no leading zeroes. (example: 9 - correct, 09 - incorrect)

	var date = { year: 2027, month: 1, day: 1};
	var time = { hours: 1, minutes: 1, seconds: 1 };

	/*** Stop editing here ***/
	
	var currentDate = new Date();
	var enforcedBreakEnd = new Date(
		date.year,date.month-1,date.day,time.hours,time.minutes,time.seconds);
	$.getJSON("/api.php?action=query&meta=siteinfo&siprop=general&format=json", function(data) {
        var serverTimeStr = data.query.general.time; // ISO 8601 string
        var serverTime = new Date(serverTimeStr);

        if (serverTime < enforcedBreakEnd) {
			alert("Enforced wikibreak until "+enforcedBreakEnd.toLocaleString()
				+ "\n(now is "+currentDate.toLocaleString()+")\n\nBye!");
			mw.loader.using(["mediawiki.api", "mediawiki.user"]).then(function ()
			{
				new mw.Api().post(
				{
					action: 'logout',
					token: mw.user.tokens.get('csrfToken')
				}).done(function (data)
				{
					location = "//" + location.host + "/w/index.php?title="
						 + "Special:Userlogin&returnto=Main_Page";
				}).fail(function ()
				{
					console.log("logout failed");
				});
			});
        }
	});
});
/*** END WIKIBREAK ENFORCER ***/
