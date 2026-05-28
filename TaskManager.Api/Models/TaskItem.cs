using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.Models;

public class TaskItem
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = null!;
    [Required]
    public string Description { get; set; } = null!;
    public string? AssignedTo { get; set; }
    public TaskItemStatus Status { get; set; } = TaskItemStatus.Pending;
    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? DueDate { get; set; }


}
